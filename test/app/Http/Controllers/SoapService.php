<?php

namespace App\Http\Controllers;

use App\Models\Beneficier;
use App\Models\RandomToken;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Carbon\Carbon;
use SoapServer;

class SoapService
{
    public function generateUniqueToken($cin)
    {
        $token = Str::random(60);

        while (RandomToken::where('token', $token)->exists()) {
            $token = Str::random(60);
        }

        $expirationTime = Carbon::now()->addHour();

        $newToken = RandomToken::create([
            'token' => $token,
            'date_expire' => $expirationTime,
        ]);

        return response()->json([
            'token' => $newToken->token,
            'date_expire' => $newToken->date_expire,
            'message' => 'Token has been generated successfully.',
        ]);
    }

    public function verifyToken($cin, $token)
    {
        $beneficier = Beneficier::where('cin', $cin)->first();

        if (!$beneficier) {
            return [
                'message' => 'User not found with the given CIN.',
            ];
        }

        $randomToken = RandomToken::where('token', $token)->first();

        if (!$randomToken) {
            return [
                'message' => 'Token not found.',
            ];
        }

        if (Carbon::parse($randomToken->date_expire)->isPast()) {
            return [
                'message' => 'Token has expired.',
            ];
        }

        return [
            'message' => 'Token is valid.',
            'token' => $randomToken->token,
            'date_expire' => $randomToken->date_expire,
        ];
    }
}
$server = new SoapServer(null, [
    'uri' => 'http://localhost:8000/soap'
]);

$server->setClass('SoapService');
$server->handle();
