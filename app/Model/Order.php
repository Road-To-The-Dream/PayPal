<?php

namespace App\Model;

use App\Services\Products;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    public function orders()
    {
        return $this->belongsToMany(Products::class, 'orders_products');
    }
}
