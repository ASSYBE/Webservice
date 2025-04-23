<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Models\Parametre;
use Exception;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = Notification::all();
        return view('pages.notification.index', compact('notifications'));
    }

    public function create(){
        $status_notification = Parametre::where('nom_liste','notification')->get();
        $first_status = $status_notification->first();
        return view('pages.notification.create',compact('first_status'));
    }

    public function store(Request $request){
        $input = $request->all();
        $input['date_creation']=now();
        $input['cin']='GH345673';

        //dd($input);
        Notification::create($input);
        return redirect("notification")->with('message', 'Rendez-vous créé avec succès');

    }

    public function show(string $id){
        $notification = Notification::where('id', $id)->firstOrFail();
        return view('pages.notification.show', compact('notification'));
    }

    public function edit(string $id)
    {
        try {
            $notification = Notification::where('id', $id)->firstOrFail();
            $status_notification = Parametre::where('nom_liste','notification')->get();
            $first_status = $status_notification->first();
            if ($notification !== null)
                return view('pages.notification.edit')->with(['notification' => $notification, 'first_status' => $first_status]);

        } catch (Exception $e) {
            return view("pages.notification.edit")->with('message', $e->getMessage());
        }
    }

    public function update(Request $request,string $id){
        $notification = Notification::where('id', $id)->firstOrFail();
        $input = $request->all();

        $notification->update($input);
        return redirect("notification")->with('message', 'Rendez-vous créé avec succès');

    }

    
}
