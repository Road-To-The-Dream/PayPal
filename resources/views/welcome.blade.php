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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.maskedinput/1.4.1/jquery.maskedinput.min.js"></script>

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
<body onload="onloadPage()">
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

    <header>
        <div class="top_page">
            <div class="top_page_logo">
                <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/e/ed/Coca-Cola_Light_logo.png"
                                 alt="top_log"></a>
            </div>
            <div class="top_page_logo_small">
                <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/e/ed/Coca-Cola_Light_logo.png"
                                 alt="top_log"></a>
            </div>
            <div class="top_page_navigation">
                <span><a href="#">Contacts</a></span>
                <span><a href="#">Shop</a></span>
                <div class="menu_rects" onclick="diplay_hide('.top_page_main_menu')">
                    <div class="menu_rect1"></div>
                    <div class="menu_rect2"></div>
                    <div class="menu_rect3"></div>
                </div>
                <div class="logout">
                    @guest
                        <div class="ellipse_user">
                            <img src="../img/user.png">
                        </div>
                    @else
                        <a class="nav-link" href="#">
                            {{ Auth::user()->name }}
                        </a>
                        <a class="dropdown-item" href="{{ route('logout') }}"
                           onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                            {{ __('Logout') }}
                        </a>

                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                            @csrf
                        </form>
                    @endguest
                </div>
                <div class="order-history">
                    <div class="close-history">X</div>
                    <h1>@guest @else {{ Auth::user()->name }} @endguest this is your Order History</h1>
                    <p class="order-history-head">
                        <span>Order ID</span>
                        <span>Product details</span>
                    </p>

                    <div class="order-history-content">

                    </div>

                </div>
            </div>
        </div>
        <ul class="top_page_main_menu">
            <li class="tab_navi"><a href="#">Shop</a>

            </li>
            <li class="tab_navi"><a href="#">Contacts</a>

            </li>
            <li class="main_tab">Categories
                <ul class="submenu">
                    @foreach($categories as $category)
                        <li onclick="onloadGetData(0, {{ $category->id }})">{{ $category->name }}</li>
                    @endforeach
                </ul>
            </li>
            <li class="main_tab"><a href="#">Repearing servise</a>

            </li>
            <li class="main_tab"><a href="#">Repearing servise</a>

            </li>
            <li class="main_tab"><a href="#">Repearing servise</a>

            </li>
            <li class="main_tab_lang"><a href="#">Choose your language</a>
                <ul class="submenu">
                    <li><a href=#>Russian</a></li>
                    <li><a href=#>English</a></li>
                </ul>
            </li>
        </ul>
    </header>
    <div class="order">
        <div>
            <button class="but-cart">
                <div class="miltiply-items-button">0</div>
                <img src="https://www.freepngimg.com/thumb/cart/8-2-cart-picture.png"/>Cart
            </button>
            <div class="cart">
                <button class="x">x</button>
                <p class="total"></p>
                <div class='cart-cart'></div>
                <div class="pay-pal-inputs">
                    <p id="errors-pay"></p>
                    <span>Email</span>
                    <input id="pay_email" type="text" name="pay_email" placeholder="Enter EMAIL" value="@guest @else {{ Auth::user()->email }} @endguest">
                    <span>Phone</span>
                    <input id="pay_phone" type="text" name="pay_phone" placeholder="Enter Phone" value="@guest @else {{ Auth::user()->phone }} @endguest">
                </div>
                <input class="w3-input w3-border" id="total-price" type="hidden" name="total-price" value="">
                <button id="btn-pay" class="w3-btn w3-blue">Pay with PayPal</button>
            </div>
            <div class="products"></div>
        </div>
        <div class="pages"></div>
    </div>
    <footer>
        <div class="bottom_page">
            <div class="bottom_page_logo">
                <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/e/ed/Coca-Cola_Light_logo.png"
                                 alt="top_log"></a>
                <p class="under_logo_bottom">© Test-TEST 2019</p>
            </div>
            <div class="bottom_page_navigation">
                <div class="bottom_page_navigation_tabs">
                    <p class="tabs_titles">Contacts</p>
                    <p class="tab_contact"><a href="tg://resolve?domain=vitalii">Phone: +(380) 680 32 08 08</a></p>
                    <p class="tab_contact"><a href="tg://resolve?domain=SergeySushko25">Phone: +(380) 966 99 83 68</a>
                    </p>
                </div>
                <div class="bottom_page_navigation_tabs">
                    <p class="tabs_titles">How to find us</p>
                    <p class="tabs_adress">Test ave. Twest 000/123</p>
                    <p class="tabs_adress">from 9.00 til 20.00 No OFFs</p>
                    <p class="tabs_adress"><img src="../img/image4.4.png"></p>
                </div>
                <div class="bottom_page_navigation_tabs">
                    <p class="tabs_titles">How to find us</p>
                    <p class="tabs_links"><a href="#">e-mail: test@test_test.com</p></a>
                    <div class="socials">
                        <a href="#">
                            <div class="ellipse_socials"><img src="../img/facebook.png"></div>
                        </a>
                        <a href="#">
                            <div class="ellipse_socials"><img src="../img/instagram.png"></div>
                        </a>
                        <a href="#">
                            <div class="ellipse_socials"><img src="../img/pinterest.png"></div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <div class="product-info">
        <div class="close-info">X</div>
        <p class="product-info-id"></p>
        <div class="product-info-content">
            <div class="slider single-item">
                <ul id="slides"></ul>
                <button class="controls" id="previous"><<<</button>
                <button class="controls" id="pause">||</button>
                <button class="controls" id="next">>>></button>
            </div>
            <div class="product-info-content-details">
                <h2 class="product-info-title"></h2>
                <h3 class="product-info-description"></h3>
                <div class="product-info-characteristics"></div>
                <h3 class="product-info-price"></h3>
            </div>
        </div>
    </div>

    <div class="registration_div">
        <form class="registration" method="POST" action="{{ route('register') }}">
            @csrf
            <div class="top_form_registration">
                <span class="enter_registration"><a class="enter_registration_a" href="#">Sign IN</a></span>
                <span class="reg_registration"><a class="reg_registration_a" href="#">Registration</a></span>
                <div class="close_form_registration"><img src="../img/times.svg"></div>
            </div>
            <div class="inputs_registration">
                <p id="errors-register"></p>
                <label>
                    <span>Name</span>
                    <input type="text" id="name" name="name">
                </label>
                <label for="email">
                    <span>Email</span>
                    <input type="text" id="email-register" name="email">
                </label>
                <label>
                    <span>Phone</span>
                    <input type="text" id="phone-register" name="phone">
                </label>
                <label>
                    <span>Password</span>
                    <input type="password" id="password-register" name="password">
                </label>
                <label>
                    <span>Confirm password</span>
                    <input type="password" id="password_confirmation" name="password_confirmation">
                </label>
                <button type="button" id="submit-register" name="submit" class="form_button_registration">Go on</button>
            </div>
            <p class="or_enter_p">or</p>
            <p><a href="#" class="or_enter">sign in</a></p>
        </form>
    </div>
    <div class="log_in_div">
        <form class="log_in" method="POST" action="{{ route('login') }}">
            @csrf
            <div class="top_form_log_in">
                <span class="enter_log_in"><a class="enter_log_in_a" href="#">Sign IN</a></span>
                <span class="reg_log_in"><a class="reg_log_in_a" href="#">Registration</a></span>
                <div class="close_form_log_in"><img src="../img/times.svg"></div>
            </div>
            <div class="inputs_log_in">
                <p id="errors-login"></p>
                <label for="email">
                    <span>Email</span>
                    <input id="email" type="text" name="email">
                </label>
                <label for="password">
                    <span>Password</span>
                    <input id="password" type="password" name="password">
                </label>
                <button id="submit-login" type="button" name="submit" class="form_button_log_in">Go on</button>
            </div>
            <p class="or_register_p">or</p>
            <p><a href="#" class="or_register">register</a></p>
        </form>
    </div>
</div>
<script src="{{ asset('js/bundle.js') }}"></script>
<script>
    $("#phone-register").mask("+380-99-999-9999");
    $("#pay_phone").mask("+380-99-999-9999");
</script>
</body>
</html>
