<?php

use Illuminate\Database\Seeder;

class ProductsImagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                'product_id' => '1',
                'image_id' => '1'
            ],
            [
                'product_id' => '1',
                'image_id' => '2'
            ],
            [
                'product_id' => '1',
                'image_id' => '2'
            ],

            [
                'product_id' => '31',
                'image_id' => '4'
            ],
            [
                'product_id' => '31',
                'image_id' => '5'
            ],

            [
                'product_id' => '2',
                'image_id' => '1'
            ],
            [
                'product_id' => '2',
                'image_id' => '2'
            ],
            [
                'product_id' => '2',
                'image_id' => '3'
            ],
        ];

        DB::table('products_images')->insert($data);
    }
}
