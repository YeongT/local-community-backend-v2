package com.kanduit.localcommunity.controller.status;

import com.kanduit.localcommunity.model.response.CommonResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StatusController {
    private final StatusCheckAPI checkAPI;

    public StatusController(StatusCheckAPI checkAPI) {
        this.checkAPI = checkAPI;
    }

    @GetMapping(value = "/status")
    public CommonResponse statusCheck() {
        return new CommonResponse().setCode(200).setMessage(checkAPI.echoHelloWorld());
    }
}
