<?php

use Illuminate\Database\Seeder;

class ImagesTableSeeder extends Seeder
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
                'path' => 'https://www.lg.com/au/images/tvs/42ln5400/gallery/medium01.jpg'
            ],
            [
                'path' => 'https://rim.org.ru/wp-content/uploads/2019/02/13614.970-4.png'
            ],
            [
                'path' => 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5792/5792903ld.jpg'
            ]
        ];

        DB::table('images')->insert($data);
    }
}
