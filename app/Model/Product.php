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
}
