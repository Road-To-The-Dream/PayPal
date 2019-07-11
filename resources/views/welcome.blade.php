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

        .img-holder img {
            width: 80%;
        }
    </style>
</head>
<body>
<div class="container">
    @if ($message = Session::get('success'))
        <div id="message-destroy-recipe" class="alert alert-success mt-5" role="alert">
            <p>{!! $message !!}</p>
        </div>
        <?php Session::forget('success');?>
    @endif

    @if ($message = Session::get('error'))
        <div id="message-destroy-recipe" class="alert alert-error mt-5  " role="alert">
            <p>{!! $message !!}</p>
        </div>
        <?php Session::forget('error');?>
    @endif

    @error('total-price')
    <div class="alert alert-danger mt-5">{{ $message }}</div>
    @enderror
    <div class="order">
        <button class="but-cart">Cart</button>
        <div class="cart">
            <button class="x">x</button>
            <p class="total"></p>
            <div class='cart-cart'>

            </div>
            <form class="wrapper-form" method="POST" id="payment-form" action="{!! URL::to('paypal') !!}">
                @csrf
                <input class="w3-input w3-border" id="total-price" type="hidden" name="total-price" value="">
                <button class="w3-btn w3-blue">Pay with PayPal</button>
            </form>
        </div>
    </div>
</div>
<script>
    let products = ('<?=$products?>');
</script>
<script src="{{ asset('js/bundle.js') }}"></script>
</body>
</html>
