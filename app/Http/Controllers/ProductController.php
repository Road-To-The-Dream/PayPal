<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;
use App\Model\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        //
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
        $productKeys = array_keys($request->session()->get('productId'));

        for ($i = 0; $i < count($request->session()->get('productId')); $i++) {
            if ($request->session()->get("productId.{$productKeys}.0") === $request->get('productId')) {
                $request->session()->forget("productId.{$productKeys[$i]}");
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
}
