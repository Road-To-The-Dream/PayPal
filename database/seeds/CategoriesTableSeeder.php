<?php

use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
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
                'name' => 'Phone'
            ],
            [
                'name' => 'TV'
            ],
            [
                'name' => 'Laptops'
            ]
        ];

        DB::table('categories')->insert($data);
    }
}
