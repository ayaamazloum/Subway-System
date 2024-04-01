<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\InvitationEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class AdminBranchController extends Controller
{
    public function index()
    {
        $toEmail = "hanadi.hosri@gmail.com";
        $message = "hello world";
        $response =  Mail::to($toEmail)->send(new InvitationEmail($message));
        dd($response);
    }
}
