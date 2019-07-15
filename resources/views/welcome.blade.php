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
    <header class="header">
        <img class="bottom_page_logo img" src="https://www.w3.org/Graphics/PNG/alphatest.png"/>
        <a href="#">Contacts</a>
        <a href="#">Shop</a>
        <a href="#">Details</a>
        <img src="https://www.seeking.com/img/google-play-badge.png">
    </header>
    <div class="menu">
        <ul class="top_page_main_menu">
            <li class="main_tab"><a href="#">Fixing Services</a>
                <ul class="submenu">
                    <li><a href=#>TV Fixing</a></li>
                    <li><a href=#>TV Fixing</a></li>
                    <li><a href=#>TV Fixing</a></li>
                    <li><a href=#>TV Fixing</a></li>
                    <li><a href=#>TV Fixing</a></li>
                    <li><a href=#>TV Fixing</a></li>
                </ul>
            </li>
            <li class="main_tab"><a href="#">Fixing Services</a>

            </li>
            <li class="main_tab"><a href="#">Fixing Services</a>
            </li>
            <li class="main_tab"><a href="#">Fixing Services</a>
            </li>
        </ul>
    </div>
        <div class="order">

            <button class="but-cart">
                <div class="miltiply-items-button"></div>
                <img src="https://www.freepngimg.com/thumb/cart/8-2-cart-picture.png"/>Cart</button>
            <div class="cart">
                <button class="x">x</button>
                <p class="total"></p>
                <div class='cart-cart'></div>
                <form class="wrapper-form" method="POST" id="payment-form" action="{!! URL::to('paypal') !!}">
                    @csrf
                    <input class="w3-input w3-border" id="total-price" type="hidden" name="total-price" value="">
                    <button class="w3-btn w3-blue">Pay with PayPal</button>
                </form>
            </div>
        </div>

        <footer>
            <div class="bottom_page">
                <div class="bottom_page_logo">
                    <a href="#"><img src="https://www.w3.org/Graphics/PNG/alphatest.png" alt="top_log"></a>
                    <p class="under_logo_bottom">© TEST test</p>
                </div>
                <div class="bottom_page_navigation">
                    <div class="bottom_page_navigation_tabs">
                        <p class="tabs_titles">Контакты</p>
                        <p class="tab_contact"><a href="#">Phone: (057) 719-69-30</p></a>
                        <p class="tab_contact"><a href="#">Phone: (050) 424-77-52</p></a>
                        <p class="tab_contact"><a href="#">Phone: (068) 761-86-63</p></a>
                    </div>
                    <div class="bottom_page_navigation_tabs">
                        <p class="tabs_titles">Где мы находимся</p>
                        <p class="tabs_adress">г. Харьков, проспект Гагарина, 20

                        </p>
                        <p class="tabs_adress">c 9.00 до 20.00 без выходных</p>
                        <p class="tabs_adress"><img src="https://www.seeking.com/img/google-play-badge.png"></p>
                    </div>
                    <div class="bottom_page_navigation_tabs">
                        <p class="tabs_titles">Где нас найти</p>
                        <p class="tabs_links"><a href="#">e-mail: shop@electrodim.com</p></a>
                        <div class="socials">
                            <a href="#">
                                <div class="ellipse_socials"><img
                                            src="http://www.benandpets.com/wp-content/uploads/2019/06/87390.png"></div>
                            </a>
                            <a href="#">
                                <div class="ellipse_socials"><img
                                            src="http://www.benandpets.com/wp-content/uploads/2019/06/87390.png"></div>
                            </a>
                            <a href="#">
                                <div class="ellipse_socials"><img
                                            src="http://www.benandpets.com/wp-content/uploads/2019/06/87390.png"></div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
    <script src="{{ asset('js/bundle.js') }}"></script>
</body>
</html>
