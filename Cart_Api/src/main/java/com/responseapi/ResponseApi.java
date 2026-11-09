package com.responseapi;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ResponseApi<T> {

    private int status;

    private String msg;

    private T data;
}