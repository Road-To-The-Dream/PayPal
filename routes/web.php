<?php

Auth::routes();

Route::get('/', 'HomeController@index')->name('home');

Route::get('/home', 'PayPalController@index');

Route::get('/all-products', 'PayPalController@getProducts');

// route for processing payment
Route::post('paypal', 'PayPalController@pay');

// route for check status of the payment
Route::get('status', 'PayPalController@getPaymentStatus');

Route::post('add-to-cart', 'ProductController@addToCart');

Route::post('increase-product-amount', 'ProductController@increaseAmount');

Route::post('decrease-product-amount', 'ProductController@decreaseAmount');

Route::post('delete-from-cart', 'ProductController@deleteFromCart');
