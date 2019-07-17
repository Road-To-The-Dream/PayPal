<?php

use Illuminate\Database\Seeder;

class CharacteristicsTableSeeder extends Seeder
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
                'name' => 'Диагональ экрана'
            ],
            [
                'name' => 'Разрешение'
            ],
            [
                'name' => 'Поддержка Smart TV'
            ],
            [
                'name' => 'Wi-Fi'
            ],
            [
                'name' => 'Smart-платформа'
            ],
            [
                'name' => 'Страна-производитель'
            ],
            [
                'name' => 'Диапазоны цифрового тюнера'
            ],
            [
                'name' => 'HDR'
            ],
            [
                'name' => 'ТВ-тюнер'
            ],
            [
                'name' => 'Цвет'
            ],
            [
                'name' => 'Контрастность'
            ],
            [
                'name' => 'Частота обновления'
            ],
            [
                'name' => 'Аудиосистема'
            ],
            [
                'name' => 'Страна регистрации бренда'
            ],
            [
                'name' => 'Гарантия'
            ]
        ];

        DB::table('characteristics')->insert($data);
    }
}
