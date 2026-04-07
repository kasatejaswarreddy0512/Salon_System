package com.ktsr.config;


import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;


import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;


public class KeyCloakConverter implements Converter<Jwt, Collection<GrantedAuthority>> {

    private static final String CLIENT_ID = "salon-booking-client"; // ✅ important

    @Override
    public Collection<GrantedAuthority> convert(Jwt jwt) {

        Collection<GrantedAuthority> authorities = new ArrayList<>();

        // ✅ REALM ROLES
        Map<String, Object> realmAccess = jwt.getClaimAsMap("realm_access");
        if (realmAccess != null && realmAccess.containsKey("roles")) {
            List<String> roles = (List<String>) realmAccess.get("roles");
            roles.forEach(role ->
                    authorities.add(new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()))
            );
        }

        // ✅ CLIENT ROLES (FIXED)
        Map<String, Object> resourceAccess = jwt.getClaimAsMap("resource_access");

        if (resourceAccess != null && resourceAccess.containsKey(CLIENT_ID)) {

            Map<String, Object> client = (Map<String, Object>) resourceAccess.get(CLIENT_ID);

            if (client.containsKey("roles")) {
                List<String> roles = (List<String>) client.get("roles");

                roles.forEach(role ->
                        authorities.add(new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()))
                );
            }
        }

        return authorities;
    }
}


//public class KeyCloakConverter implements Converter<Jwt, Collection<GrantedAuthority>> {
//
//
//    @Override
//    public Collection<GrantedAuthority> convert(Jwt jwt) {
//
//        Collection<GrantedAuthority> authorities = new ArrayList<>();
//
//        Map<String, Object> realmAccess = jwt.getClaimAsMap("realm_access");
//        if(realmAccess!=null && realmAccess.containsKey("roles")) {
//            List<String> realmRoles=(List<String>) realmAccess.get("roles");
//            realmRoles.forEach(role-> authorities.add(
//                    new SimpleGrantedAuthority("ROLE_"+role.toUpperCase())));
//        }
//
//        Map<String, Object> resourceAccess = jwt.getClaimAsMap("resource_access");
//        if(resourceAccess!=null && resourceAccess.containsKey("roles")) {
//            resourceAccess.forEach((client,clientDetail)->{
//                Map<String, Object> clientRoles=(Map<String, Object>) clientDetail;
//                if (clientRoles.containsKey("roles")) {
//                    List<String> roles=(List) clientRoles.get("roles");
//                    roles.forEach(role-> authorities.add(new SimpleGrantedAuthority("ROLE_"+role.toUpperCase())));
//
//                }
//            });
//        }
//        return authorities;
//    }
//}
