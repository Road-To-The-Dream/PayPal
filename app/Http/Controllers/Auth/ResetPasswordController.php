<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChangePasswordRequest;
use App\Services\Utility;
use App\User;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

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
                $request->get('old-password'),
                $request->get('new-password')
            ]);

            $user = User::where('email', $input[0])
                ->where('password', Hash::make($input[1]))
                ->get();

            $user->update(['password' => Hash::make($input[2])]);

            return response()->json(200);
        }

        return response()->view('errors.403', [], 403);
    }
}
