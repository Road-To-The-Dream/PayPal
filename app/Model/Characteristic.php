<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Characteristic extends Model
{
    public function products()
    {
        $this->belongsToMany(Product::class, 'products_characteristics');
    }
}
