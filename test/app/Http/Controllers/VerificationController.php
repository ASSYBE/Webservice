<?php

namespace App\Http\Controllers;

use App\Models\Beneficiaire;
use App\Models\TokenGenerator;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
class VerificationController extends Controller
{

    public function verifier(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required',
            'cin' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Paramètres manquants'], 400);
        }

        $token = $request->input('token');
        $cin = $request->input('cin');

        $apiResponse = Http::post("http://localhost:8001/checkToken?cin=$cin&token=$token");

        if (!$apiResponse->successful()) {
            return response()->json(['error' => 'Erreur lors de l\'appel de l\'API externe'], $apiResponse->status());
        }

        $data = $apiResponse->json();

        if (!$data || !isset($data['token'])) {
            return response()->json(['error' => 'Données reçues de l\'API externe invalides'], 500);
        }

        try {
            session(['token' => $data['token']]);

            if (session()->has('token')) {
                return response()->json([
                    'status' => 'Session active',
                    'token' => session('token')
                ], 200);
            } else {
                return response()->json(['status' => 'Aucune session active'], 401);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur lors de l\'enregistrement de la session : ' . $e->getMessage()], 500);
        }
    }

    // *************************************************************
    public function generateUniqueToken(Request $request)
    {
        $request->validate([
            'cin' => 'required|string|max:20',
            'nomAgent' => 'nullable|string|max:100',
        ]);

        do {
            $token = Str::random(60);
        } while (TokenGenerator::where('token', $token)->exists());

        $expirationTime = Carbon::now()->addDay();

        $role = $request->query('nomAgent') ? 'ANAPECAGENT' : 'ANAPECBENE';

        $newToken = TokenGenerator::create([
            'token' => $token,
            'cin' => $request->query('cin'),
            'nomAgent' => $request->query('nomAgent', null),
            'role' => $role,
            'date_expire' => $expirationTime,
        ]);

        return response()->json([
            'token' => $newToken->token,
            'cin' => $newToken->cin,
            'nomAgent' => $newToken->nomAgent,
            'role' => $newToken->role,
            'date_expire' => $newToken->date_expire,
            'message' => 'Token has been generated successfully.',
        ]);
    }


    public function verifyToken1(Request $request)
    {
        $cin = $request->query('cin');
        $token = $request->query('token');

        if (!$cin || !$token) {
            return response()->json([
                'message' => 'Missing required parameters: cin or token.',
            ], 400);
        }

        $checkCIN = TokenGenerator::where('cin', $cin)->first();

        if (!$checkCIN) {
            return response()->json([
                'message' => 'User not found with the given CIN.',
            ], 404);
        }

        $tokenGenerator = TokenGenerator::where('token', $token)->first();

        if (!$tokenGenerator) {
            return response()->json([
                'message' => 'Token not found.',
            ], 404);
        }

        if (Carbon::parse($tokenGenerator->date_expire)->isPast()) {
            return response()->json([
                'message' => 'Token has expired.',
            ], 400);
        }

        return response()->json([
            'message' => 'Token is valid.',
            'token' => $tokenGenerator->token,
            'cin' => $tokenGenerator->cin,
            'nomAgent' => $tokenGenerator->nomAgent,
            'role' => $tokenGenerator->role,
            'date_expire' => $tokenGenerator->date_expire,
        ]);
    }
    // *************************************************************


    public function logout()
    {
        session()->forget('token');

        if (!session()->has('token')) {
            return response()->json([
                'message' => 'Session closed successfully.'
            ], 200);
        }

        return response()->json([
            'message' => 'Session still active',
        ], 400);
    }
}
