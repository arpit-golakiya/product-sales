@extends('shopify-app::layouts.default')
@section('styles')
    <style>
        .Polaris-Tabs__Tab--selected .Polaris-Tabs--newDesignLanguage:before{
            content: "";
            position: absolute;
            bottom: -.1rem;
            left: 0;
            right: 0;
            height: .3rem;
            background: #006E52;
        }
    </style>
@endsection

@section('content')
    <div id="app">
    </div>
@endsection

@section('scripts')
    @parent
    <input type="hidden" id="apiKey" value="{{ config('shopify-app.api_key') }}">
    <input type="hidden" id="shopOrigin" value="{{\Auth::user()->name}}">
    <input type="hidden" id="shopify_host" value="{{ base64_encode("https://".\Auth::user()->name."/admin")  }}">
    <script src="{{mix('js/app.js')}}" async></script>
@endsection
