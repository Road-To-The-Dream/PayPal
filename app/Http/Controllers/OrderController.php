<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaymentRequest;
use App\Model\Order;
use App\Services\Orders;
use App\Services\PayPal;
use App\Services\Products;
use Illuminate\Support\Facades\DB;
use Mockery\Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Throwable;

class OrderController extends Controller
{
    private $payService;
    private $productService;
    private $orderService;

    public function __construct(PayPal $objPayPal, Products $objProduct, Orders $objOrder)
    {
        $this->payService = $objPayPal;
        $this->productService = $objProduct;
        $this->orderService = $objOrder;
    }

    public function index(Request $request)
    {
        $orders = DB::table('orders')
            ->join('orders_products', 'orders_products.order_id', '=', 'orders.id')
            ->join('products', 'orders_products.product_id', '=', 'products.id')
            ->select(
                'products.img',
                'products.title',
                'products.description',
                'orders_products.order_id',
                'orders_products.product_id',
                'orders_products.product_amount',
                'orders_products.product_price',
                'orders_products.user_email')
            ->where('orders_products.user_email', Auth::user()->email)
            ->get();

//        $orders = Order::whereHas('products', function ($query) {
//            $query->select('orders_products.user_email')->where('orders_products.user_email', '=', Auth::user()->email);
//        })->get();

        return response()->json([
            'orders' => $orders
        ], 200);
    }

    public function store(Request $request)
    {
        try {
            $newOrder = Order::create();
            $newOrder->products()->sync($this->orderService->getArrayProductsInfo($request));

            $this->productService->decreaseProductAmountInDatabase($request->session()->get('productsId'));
        } catch (Exception $ex) {
            return response()->json([
                'message' => "Ошибка, повторите попытку позже!"
            ], 500);
        }

        $request->session()->forget('productsId');
        $request->session()->forget('email');
        $request->session()->forget('phone');

        return response()->json([
            'message' => "Заказ успешно оформлен !"
        ], 200);
    }
}
