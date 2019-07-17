<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChangePasswordRequest;
use App\Services\Utility;
use App\Model\User;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class ResetPasswordController extends Controller
{
    use ResetsPasswords;

    /**
     * Where to redirect users after resetting their password.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * @param ChangePasswordRequest $request
     * @return JsonResponse
     */
    public function changePassword(ChangePasswordRequest $request): JsonResponse
    {
        if ($request->ajax()) {
            $input = Utility::cleanField([
                $request->get('email'),
                $request->get('old_password'),
                $request->get('new_password')
            ]);

            $user = User::where('email', $input[0])->first();

            if (Hash::check($input[1], Auth::user()->getAuthPassword())) {
                $user->password = Hash::make($input[2]);
                $user->save();
                Auth::logout();
            }

            return response()->json(200);
        }

        return response()->view('errors.403', [], 403);
    }
}
