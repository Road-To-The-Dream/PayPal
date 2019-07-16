<?php

namespace App\Http\Controllers;

use App\Model\Product;
use http\Env\Response;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    private const ITEMS = 3;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($offset = 0)
    {
        return response()->json([
<<<<<<< HEAD
            'products' => Product::skip($offset)->take(self::ITEMS)->get(),
            'amount' => ceil(count(Product::all('id')) / self::ITEMS)
=======
            'products' => $w,
            'amount' => count(Product::all('id')) / 3
>>>>>>> 2ed2328f41ddf0ed3d2721766fe3537fa42399ed
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