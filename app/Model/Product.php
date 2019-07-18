<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'amount'
    ];

    public function images()
    {
        return $this->belongsToMany(Image::class, 'products_images');
    }

    public function characteristics()
    {
        return $this->belongsToMany(Characteristic::class, 'products_characteristics')->withPivot('value');
    }

    public function orders()
    {
        return $this->belongsToMany(Order::class, 'orders_products');
    }
}
