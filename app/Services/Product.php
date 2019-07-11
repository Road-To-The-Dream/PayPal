<?php

namespace App\Services;

class Product
{
    private $id;
    private $img;
    private $title;
    private $description;
    private $prise;

    public static function getProductsData()
    {
        $product = new self();
        $product->id = 0001;
        $product->img = 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5792/5792903ld.jpg';
        $product->title = 'lg tv';
        $product->description = 'wrwerwr rtgtvte tvevtvr rtrgetgfe rtrtegt rt r';
        $product->prise = '20';

        return $product;
    }
}
