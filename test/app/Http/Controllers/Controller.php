<?php

namespace App\Http\Controllers;

use App\Models\BDC;
use App\Models\Beneficiaire;
use App\Models\Beneficier;
use App\Models\Formation;
use App\Models\User;
use Exception;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function show(string $id)
    {

        $beneficier = Beneficiaire::find($id);
        if (!$beneficier)
            return response()->json([
                "message" => "not found",
            ], 404);

        return response()->json([
            "beneficier" => $beneficier,
        ], 200);
    }

    public function formation()
    {

        $parametreFormation = Formation::all();


        return response()->json([
            "formation" => $parametreFormation,
        ], 200);
    }
}
