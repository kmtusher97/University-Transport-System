package com.transport.university.universitytransportsystem.exceptions.requisition;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RequisitionNotFoundExceptionResponse {
    private String requisitionId;
}
