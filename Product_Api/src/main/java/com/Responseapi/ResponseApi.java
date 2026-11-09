package com.Responseapi;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseApi<T> {

	private Integer status;
	private String msg;
	private T data;
}


