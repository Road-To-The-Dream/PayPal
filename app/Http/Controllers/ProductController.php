<?php

namespace App\Http\Controllers;

use App\Model\Product;
use http\Env\Response;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($page = 0)
    {
        $w = Product::skip($page)->take(3)->get();

        return response()->json([
            'products' => Product::all('id'),
            'amount' => $w
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
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = Product::find($id);

        return response()->json([
            'product' => $product,
            'images' => $product->images()->get()
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

    public function addToCart(Request $request)
    {
        $request->session()->push('productsId', [$request->get('productId')]);
    }

    public function deleteFromCart(Request $request)
    {
        $productKeys = array_keys($request->session()->get('productsId'));

        for ($i = 0; $i < count($request->session()->get('productsId')); $i++) {
            if ($request->session()->get("productsId.{$productKeys[$i]}.0") === $request->get('productId')) {
                $request->session()->forget("productsId.{$productKeys[$i]}");

                break;
            }
        }
    }

    public function decreaseAmount(Request $request)
    {
        $request->session()->push('productsId', [$request->get('productId')]);
    }

    public function increaseAmount(Request $request)
    {
        $request->session()->push('productsId', [$request->get('productId')]);
    }

    public function getProductsFromCart(Request $request)
    {
        if ($request->session()->has('productsId')) {
            $productsId = [];

            foreach ($request->session()->get('productsId') as $product) {
                array_push($productsId, $product[0]);
            }

            return response()->json(Product::whereIn('id', $productsId)->get(), 200);
        }

        return response()->json(200);
    }
}