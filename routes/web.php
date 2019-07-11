<?php

Route::get('/', 'PaymentController@index');

// route for processing payment
Route::post('paypal', 'PaymentController@payWithPayPal');

// route for check status of the payment
Route::get('status', 'PaymentController@getPaymentStatus');

Route::post('increase-product-amount', 'ProductController@increaseAmount');

Route::post('decrease-product-amount', 'ProductController@decreaseAmount');
