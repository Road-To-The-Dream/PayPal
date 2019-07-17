
<?php

Auth::routes();

Route::get('/', 'Controller@getView');

// route for processing payment
Route::post('paypal', 'PayPalController@pay');

// route for check status of the payment
Route::get('status', 'PayPalController@getPaymentStatus');

Route::post('add-to-cart', 'ProductController@addToCart');

Route::post('increase-product-amount', 'ProductController@increaseAmount');

Route::post('decrease-product-amount', 'ProductController@decreaseAmount');

Route::post('delete-from-cart', 'ProductController@deleteFromCart');

Route::get('get-products-cart', 'ProductController@getProductsFromCart');

//resources controller

Route::get('product/1/{offset}', 'ProductController@index');

Route::get('product/create', 'ProductController@create');

Route::post('product', 'ProductController@store');

Route::get('product/{id}', 'ProductController@show');

Route::get('product/{id}/edit', 'ProductController@edit');

Route::put('product/{id}', 'ProductController@update');

Route::delete('product/{id}', 'ProductController@destroy');

