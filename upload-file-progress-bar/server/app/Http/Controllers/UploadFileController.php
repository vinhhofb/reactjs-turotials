<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UploadFileController extends Controller
{
    public function uploadFiles(Request $request) {
        $request->validate([
            'file' => 'required|mimes:jpg,jpeg,png,pdf,html,mp4'
        ]);

        $file = $request->file('file');
        $filename = time() . '_' . $file->getClientOriginalName();
        $file->storeAs('uploads', $filename, 'public');

        return response()->json([
            'message' => 'File uploaded successfully',
            'filename' => $filename
        ]);
    }
}
