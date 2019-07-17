
<?php

Auth::routes();

Route::get('/', 'ProductController@getView');

Route::post('paypal', 'OrderController@store');

Route::get('status', 'OrderController@getPaymentStatus');

Route::post('add-to-cart', 'ProductController@addToCart');

Route::post('increase-product-amount', 'ProductController@increaseAmount');

Route::post('decrease-product-amount', 'ProductController@decreaseAmount');

Route::post('delete-from-cart', 'ProductController@deleteFromCart');

Route::get('get-products-cart', 'ProductController@getProductsFromCart');

//resources controller
Route::get('product/page/{offset}', 'ProductController@index');

Route::get('product/create', 'ProductController@create');

Route::post('product', 'ProductController@store');

Route::get('product/{id}', 'ProductController@show');

Route::get('product/{id}/edit', 'ProductController@edit');

Route::put('product/{id}', 'ProductController@update');

Route::delete('product/{id}', 'ProductController@destroy');
//resources controller

Route::post('change-password', 'Auth\ResetPasswordController@changePassword')->middleware('auth');

