<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title')</title>
</head>
<body>
<div id="renderTransaction">
</div>
<script src="{{mix('js/app-storefrontiframe.js')}}" id="script_id_storefront" permanent-domain="{{$permanentDomain}}" product-id="{{$productId}}"></script>
</body>
</html>
