package com.transport.university.universitytransportsystem.schedule;

import com.transport.university.universitytransportsystem.model.Bus;
import com.transport.university.universitytransportsystem.service.BusServices;
import com.transport.university.universitytransportsystem.service.RequisitionServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class BusAvailabilityModifier {

    @Autowired
    private RequisitionServices requisitionServices;

    @Autowired
    private BusServices busServices;

    @Scheduled(fixedDelay = 30 * 60 * 1000, initialDelay = 60 * 1000)
    public void updateBusStatusForRequisitions() {
        System.out.println("Updating Bus status. Date & Time:" + (new Date()).toString());
        requisitionServices.getAllActiveRequisitions().forEach(
                requisition -> {
                    if (requisition.getStartDateTime().before(new Date()) && requisition.getEndDateTime().after(new Date())) {
                        Bus bus = requisition.getBus();
                        bus.setIsAvailable(false);
                        busServices.addNewBus(bus);
                        System.out.println("Bus " + bus.getNumber() + " will be available at " + requisition.getEndDateTime().toString());
                    }
                    if (requisition.getEndDateTime().before(new Date())) {
                        requisition.setIsExpired(true);
                        requisitionServices.saveOrUpdate(requisition);

                        Bus bus = requisition.getBus();
                        bus.setIsAvailable(true);
                        busServices.addNewBus(bus);
                        System.out.println("Requisition " + requisition.getRequisitionId() + " is expired");
                        System.out.println("Bus " + bus.getNumber() + " is available now");
                    }
                }
        );
    }
}
