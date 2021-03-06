<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaymentRequest;
use App\Model\Categories;
use App\Model\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\View\View;
use App\Services\Products;

class ProductController extends Controller
{
    private $productService;
    private const ITEMS = 8;

    public function __construct(Products $obj)
    {
        $this->productService = $obj;
    }

    /**
     * @return View
     */
    public function getView(): View
    {
        return view('welcome', [
            'categories' => Categories::all()
        ]);
    }

    /**
     * @param int $offset
     * @return JsonResponse
     */
    public function index($offset = 0, $categoryId = 1): JsonResponse
    {
        return response()->json([
            'products' => Product::where('category_id', $categoryId)->where('amount', '>', 0)->skip($offset)->take(self::ITEMS)->get(),
            'amount' => ceil(count(Product::where('category_id', $categoryId)->get()) / self::ITEMS)
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function show($id): JsonResponse
    {
        $product = Product::find($id);

        return response()->json([
            'product' => $product,
            'images' => $product->images()->get(),
            'characteristics' => $product->characteristics()->get()
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * @param Request $request
     */
    public function addToCart(Request $request): void
    {
        $request->session()->push('productsId', [$request->get('productId')]);
    }

    /**
     * @param Request $request
     */
    public function deleteFromCart(Request $request)
    {
        $productsKey = $this->productService->getProductsKeyInSession($request->session()->get('productsId'));

        $productsAmount = $this->productService->getProductsAmountInSession($request->session()->get('productsId'));
        for ($i = 0; $i < $productsAmount; $i++) {
            if ($request->session()->get("productsId.{$productsKey[$i]}.0") === $request->get('productId')) {
                $request->session()->forget("productsId.{$productsKey[$i]}");
            }
        }
    }

    /**
     * @param Request $request
     */
    public function decreaseAmount(Request $request): void
    {
        $request->session()->push('productsId', [$request->get('productId')]);
    }

    /**
     * @param Request $request
     */
    public function increaseAmount(Request $request)
    {
        $productKeys = $this->productService->getProductsKeyInSession($request->session()->get('productsId'));

        $productsAmount = $this->productService->getProductsAmountInSession($request->session()->get('productsId'));
        for ($i = 0; $i < $productsAmount; $i++) {
            if ($request->session()->get("productsId.{$productKeys[$i]}.0") === $request->get('productId')) {
                $request->session()->forget("productsId.{$productKeys[$i]}");
                break;
            }
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getProductsFromCart(Request $request): JsonResponse
    {
        if ($request->session()->has('productsId')) {
            $productsId = $this->productService->getProductsUniqueInSession($request->session()->get('productsId'));

            return response()->json([
                'productsInfo' => Product::whereIn('id', $productsId)->get(),
                'productsAmount' => $this->productService->getProductsInfoInSession($request->session()->get('productsId'))
            ], 200);
        }

        return response()->json(200);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function checkProductsAmount(PaymentRequest $request): JsonResponse
    {
        return $this->productService->isProductsAmount($request->session()->get('productsId'));
    }
}