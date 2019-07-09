<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Laravel</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/welcome.css') }}" rel="stylesheet">

    <script src="{{ asset('js/app.js') }}"></script>

    <!-- Styles -->
    <style>
        html, body {
            background-color: #fff;
            color: #636b6f;
            font-family: 'Nunito', sans-serif;
            font-weight: 200;
            height: 100vh;
            margin: 0;
        }

        .links > a {
            color: #636b6f;
            padding: 0 25px;
            font-size: 13px;
            font-weight: 600;
            letter-spacing: .1rem;
            text-decoration: none;
            text-transform: uppercase;
        }

        .wrapper {
            width: 200px;
            height: auto;
            border: solid 1px black;
            position: relative;
            padding: 20px;
            margin: 20px;
        }

        .img-holder {
            width: 80%;
            position: relative;
        }

        .img-holder img {
            width: 80%;
        }

        .price {
            margin: 10px 0;
        }
    </style>
</head>
<body>

<div class="container">
    <form class="wrapper" method="POST" id="payment-form" action="{!! URL::to('paypal') !!}">
        @csrf
        <div class="img-holder">
            <img src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5792/5792903ld.jpg">
        </div>
        <h2 class="title">LG television 43``</h2>
        <p class="desc">smartTV, Android 7.1, FullHD 1080px'</p>
        <p class="price">20 USD</p>
        <input class="w3-input w3-border" id="amount" type="hidden" name="amount" value="20">
        <button class="w3-btn w3-blue">Pay with PayPal</button>
    </form>

    @if ($message = Session::get('success'))
        <div id="message-destroy-recipe" class="alert alert-success" role="alert">
            <p>{!! $message !!}</p>
        </div>
        <?php Session::forget('success');?>
    @endif

    @if ($message = Session::get('error'))
        <div id="message-destroy-recipe" class="alert alert-error" role="alert">
            <p>{!! $message !!}</p>
        </div>
        <?php Session::forget('error');?>
    @endif
</div>
<script src="{{ asset('js/bundle.js') }}"></script>
</body>
</html>
