<?php

namespace App\Http\Controllers;

use App\Http\Controllers\SoapService as ControllersSoapService;
use Artisaninweb\SoapWrapper\Facades\SoapWrapper;
use Illuminate\Http\Request;

class SoapController extends Controller
{
    protected $soapService;

    public function __construct(ControllersSoapService $soapService)
    {
        $this->soapService = $soapService;
    }

    public function getWsdl()
    {
        SoapWrapper::add('TokenService', function ($service) {
            $service
                ->wsdl(route('wsdl.token'))
                ->addFunction('generateUniqueToken')
                ->addFunction('verifyToken');
        });

        return response(SoapWrapper::wsdl('TokenService'), 200)
            ->header('Content-Type', 'application/xml');
    }

    public function generateUniqueToken(Request $request)
    {
        $cin = $request->get('cin');
        return response()->json($this->soapService->generateUniqueToken($cin));
    }

    public function verifyToken(Request $request)
    {
        $cin = $request->get('cin');
        $token = $request->get('token');
        return response()->json($this->soapService->verifyToken($cin, $token));
    }
}
