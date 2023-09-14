<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LogoutController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        if ($user = auth()->user()) {
            $user->api_token = null;
            $user->save();
        }
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }
}
