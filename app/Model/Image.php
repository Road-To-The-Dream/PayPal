<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    public function products()
    {
        return $this->belongsToMany(Product::class, 'products_images');
    }
}
