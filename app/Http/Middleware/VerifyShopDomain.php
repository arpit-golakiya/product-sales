<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class VerifyShopDomain
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $ShopifyShop = $request->ShopifyShop;
        $user = User::where('name', $ShopifyShop)->first();
        if ($user->name === $ShopifyShop && $user->password !== null) {
            $request->merge(['user' => $user]);

            return $next($request);
        }
    }
}
