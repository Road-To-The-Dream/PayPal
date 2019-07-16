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

//Route::resource('product', 'ProductController');

Route::get('product/{page}', 'ProductController@index');
