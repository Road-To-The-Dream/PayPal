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
        ];

        DB::table('products_images')->insert($data);
    }
}
