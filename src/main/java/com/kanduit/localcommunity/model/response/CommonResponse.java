package com.kanduit.localcommunity.model.response;

import org.springframework.lang.NonNull;

public class CommonResponse {
    private int code;
    private String message;
    private String output;
    private String error;


    public int getCode() {
        return code;
    }

    @NonNull
    public String getMessage() {
        return message;
    }

    public String getOutput() {
        return output;
    }

    public String getError() {
        return error;
    }

    public CommonResponse setMessage(@NonNull String message) {
        this.message = message;
        return this;
    }


    public CommonResponse setOutput(String output) {
        this.output = output;
        return this;
    }


    public CommonResponse setCode(int code) {
        this.code = code;
        return this;
    }

    public CommonResponse setError(String error) {
        this.error = error;
        return this;
    }
}
