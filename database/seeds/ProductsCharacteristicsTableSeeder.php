<?php

use Illuminate\Database\Seeder;

class ProductsCharacteristicsTableSeeder extends Seeder
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
                'characteristic_id' => '1',
                'value' => '32"'
            ],
            [
                'product_id' => '1',
                'characteristic_id' => '2',
                'value' => '1920x1080'
            ],
            [
                'product_id' => '1',
                'characteristic_id' => '3',
                'value' => 'Есть'
            ],
            [
                'product_id' => '1',
                'characteristic_id' => '4',
                'value' => 'Да'
            ],
            [
                'product_id' => '1',
                'characteristic_id' => '5',
                'value' => 'Samsung Smart TV'
            ],
            [
                'product_id' => '1',
                'characteristic_id' => '6',
                'value' => 'Россия'
            ],
            [
                'product_id' => '1',
                'characteristic_id' => '7',
                'value' => 'DVB-C, DVB-S2, DVB-T2'
            ],
            [
                'product_id' => '1',
                'characteristic_id' => '8',
                'value' => 'Есть'
            ],
            [
                'product_id' => '1',
                'characteristic_id' => '9',
                'value' => '2 ТВ-тюнера (аналоговый + цифровой)'
            ],
            [
                'product_id' => '1',
                'characteristic_id' => '10',
                'value' => 'Black'
            ],
            [
                'product_id' => '1',
                'characteristic_id' => '11',
                'value' => 'Mega Contrast'
            ],
            [
                'product_id' => '1',
                'characteristic_id' => '12',
                'value' => '500 Гц (PQI)'
            ],
            [
                'product_id' => '1',
                'characteristic_id' => '13',
                'value' => 'Выходная мощность звука: 10 Вт, Dolby Digital Plus'
            ],
            [
                'product_id' => '1',
                'characteristic_id' => '14',
                'value' => 'Корея'
            ],
            [
                'product_id' => '1',
                'characteristic_id' => '15',
                'value' => '12 месяцев официальной гарантии от производителя'
            ],

            [
                'product_id' => '2',
                'characteristic_id' => '1',
                'value' => '32"'
            ],
            [
                'product_id' => '2',
                'characteristic_id' => '2',
                'value' => '1920x1080'
            ],
            [
                'product_id' => '2',
                'characteristic_id' => '3',
                'value' => 'Есть'
            ],
            [
                'product_id' => '2',
                'characteristic_id' => '4',
                'value' => 'Да'
            ],
            [
                'product_id' => '2',
                'characteristic_id' => '5',
                'value' => 'Samsung Smart TV'
            ],
            [
                'product_id' => '2',
                'characteristic_id' => '6',
                'value' => 'Россия'
            ],
            [
                'product_id' => '2',
                'characteristic_id' => '7',
                'value' => 'DVB-C, DVB-S2, DVB-T2'
            ],
            [
                'product_id' => '2',
                'characteristic_id' => '8',
                'value' => 'Есть'
            ],
            [
                'product_id' => '2',
                'characteristic_id' => '9',
                'value' => '2 ТВ-тюнера (аналоговый + цифровой)'
            ],
            [
                'product_id' => '2',
                'characteristic_id' => '10',
                'value' => 'Black'
            ],
            [
                'product_id' => '2',
                'characteristic_id' => '11',
                'value' => 'Mega Contrast'
            ],
            [
                'product_id' => '2',
                'characteristic_id' => '12',
                'value' => '500 Гц (PQI)'
            ],
            [
                'product_id' => '2',
                'characteristic_id' => '13',
                'value' => 'Выходная мощность звука: 10 Вт, Dolby Digital Plus'
            ],
            [
                'product_id' => '2',
                'characteristic_id' => '14',
                'value' => 'Корея'
            ],
            [
                'product_id' => '2',
                'characteristic_id' => '15',
                'value' => '12 месяцев официальной гарантии от производителя'
            ],
        ];

        DB::table('products_characteristics')->insert($data);
    }
}
