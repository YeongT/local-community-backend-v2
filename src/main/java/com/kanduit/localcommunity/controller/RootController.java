package com.kanduit.localcommunity.controller;

import com.kanduit.localcommunity.model.response.CommonResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.http.HttpResponse;

@RestController
public class RootController {
    @GetMapping("/")
    public CommonResponse rootAPI() {
        return new CommonResponse().setCode(200).setMessage("TEST").setOutput(null).setError(null);
    }
}
