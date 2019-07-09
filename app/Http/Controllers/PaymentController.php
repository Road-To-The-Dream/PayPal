<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaymentRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Input;
use PayPal\Api\Amount;
use PayPal\Api\Item;
use PayPal\Api\ItemList;
use PayPal\Api\Payer;
use PayPal\Api\Payment;
use PayPal\Api\PaymentExecution;
use PayPal\Api\RedirectUrls;
use PayPal\Api\Transaction;
use PayPal\Auth\OAuthTokenCredential;
use PayPal\Exception\PayPalConnectionException;
use PayPal\Rest\ApiContext;
use Redirect;
use Session;
use URL;

class PaymentController extends Controller
{
    private $apiContext;

    public function __construct()
    {
        /** PayPal api context **/
        $paypalConf = Config::get('paypal');
        $this->apiContext = new ApiContext(new OAuthTokenCredential(
                $paypalConf['client_id'],
                $paypalConf['secret'])
        );
        $this->apiContext->setConfig($paypalConf['settings']);
    }

    public function index()
    {
        return view('welcome');
    }

    public function payWithPayPal(PaymentRequest $request)
    {
        $payer = new Payer();
        $payer->setPaymentMethod('paypal');

        $item_1 = new Item();

        $item_1->setName('Телевизор')
            ->setCurrency('USD')
            ->setQuantity(1)
            ->setPrice($request->get('amount'));

        $item_list = new ItemList();
        $item_list->setItems(array($item_1));

        $amount = new Amount();
        $amount->setCurrency('USD')
            ->setTotal($request->get('amount'));

        $transaction = new Transaction();
        $transaction->setAmount($amount)
            ->setItemList($item_list)
            ->setDescription('Продажа телевизора');

        $redirect_urls = new RedirectUrls();
        $redirect_urls->setReturnUrl(URL::to('status'))
            ->setCancelUrl(URL::to('status'));

        $payment = new Payment();
        $payment->setIntent('Sale')
            ->setPayer($payer)
            ->setRedirectUrls($redirect_urls)
            ->setTransactions(array($transaction));

        try {
            $payment->create($this->apiContext);
        } catch (PayPalConnectionException $ex) {
            if (Config::get('app.debug')) {
                Session::put('error', 'Connection timeout');
            } else {
                Session::put('error', 'Some error occur, sorry for inconvenient');
            }

            return Redirect::to('/');
        }

        foreach ($payment->getLinks() as $link) {
            if ($link->getRel() == 'approval_url') {
                $redirect_url = $link->getHref();
                break;
            }
        }

        Session::put('paypal_payment_id', $payment->getId());

        if (isset($redirect_url)) {
            return Redirect::away($redirect_url);
            /** redirect to paypal **/
        }

        Session::put('error', 'Unknown error occurred');

        return Redirect::to('/');
    }

    public function getPaymentStatus()
    {
        /** Get the payment ID before session clear **/
        $payment_id = Session::get('paypal_payment_id');

        /** clear the session payment ID **/
        Session::forget('paypal_payment_id');

        if (empty(Input::get('PayerID')) || empty(Input::get('token'))) {
            Session::put('error', 'Payment failed');

            return Redirect::to('/');
        }

        $payment = Payment::get($payment_id, $this->apiContext);
        $execution = new PaymentExecution();
        $execution->setPayerId(Input::get('PayerID'));

        /**Execute the payment **/
        $result = $payment->execute($execution, $this->apiContext);

        if ($result->getState() == 'approved') {
            Session::put('success', 'Payment success');

            return Redirect::to('/');
        }

        Session::put('error', 'Payment failed');

        return Redirect::to('/');
    }
}
