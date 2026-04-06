package com.ktsr.service;

import com.ktsr.DTO.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class KeyCloakService {

    private static final String KEYCLOAK_BASE = "http://localhost:8080";
    private static  final String KEYCLOAK_ADMIN_API=KEYCLOAK_BASE+"/admin/realms/master/users";

    private static final String TOKEN_URL=KEYCLOAK_BASE+"/realms/master/protocol/openid-connect/token";

    private static  final String CLIENT_ID = "salon-booking-client";
    private  static final String CLIENT_SECRET="kBYjLrf1aBpHAEPBKLvbHKLcTaWNZ4uH";

    private  static  final String GRANT_TYPE="password";
    private  static  final String scope= "openid profile email";
    private  static  final String username="teja";
    private  static  final String password="123456";

    private static final String clientId="bdce1cff-c273-4a56-8e49-7afbf1578178";



    private final RestTemplate restTemplate;


    public void createUser(SignupDTO signupDTO) throws Exception{

        String ACCESS_TOKEN= getAdminAccessToken(username,password,GRANT_TYPE,null).getAccessToken();

        Credential credential= new Credential();
        credential.setTemporary(false);
        credential.setType("password");
        credential.setValue(signupDTO.getPassword());

        UserRequest userRequest= new UserRequest();
        userRequest.setUsername(signupDTO.getUsername());
        userRequest.setEmail(signupDTO.getEmail());
        userRequest.setEnabled(true);
        userRequest.setFirstName(signupDTO.getFullName());
        userRequest.getCredentials().add(credential);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(ACCESS_TOKEN);

        HttpEntity<UserRequest> request = new HttpEntity<UserRequest>(userRequest, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                KEYCLOAK_ADMIN_API, HttpMethod.POST, request, String.class);



        if (response.getStatusCode()==HttpStatus.CREATED){
            System.out.println("User created successfully");

            KeycloakUserDto user= fetchFirstUserByUsername(signupDTO.getUsername(),ACCESS_TOKEN);

            KeycloakRole role= getRoleByName(clientId,ACCESS_TOKEN,signupDTO.getRole().toString());

            List<KeycloakRole> roles=new ArrayList<>();
            roles.add(role);

            assignRole(user.getId(),clientId,roles, ACCESS_TOKEN);
        }else{
            System.out.println("User creation failed");
            throw  new Exception(response.getBody());
        }


    }


    public TokenResponse getAdminAccessToken(String username,
                                             String password,
                                             String grantType,
                                             String refreshToken) throws Exception {

        HttpHeaders headers = new HttpHeaders();

        // ✅ FIXED (VERY IMPORTANT)
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();

        // ✅ handle both flows correctly
        if ("refresh_token".equals(grantType)) {
            requestBody.add("grant_type", "refresh_token");
            requestBody.add("refresh_token", refreshToken);
        } else {
            requestBody.add("grant_type", "password");
            requestBody.add("username", username);
            requestBody.add("password", password);
        }

        requestBody.add("client_id", CLIENT_ID);
        requestBody.add("client_secret", CLIENT_SECRET);

        HttpEntity<MultiValueMap<String, String>> request =
                new HttpEntity<>(requestBody, headers);

        ResponseEntity<TokenResponse> response = restTemplate.exchange(
                TOKEN_URL, HttpMethod.POST, request, TokenResponse.class);

        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            return response.getBody();
        }

        throw new Exception("Failed to obtain access token");
    }


    public KeycloakRole getRoleByName(String clientId,
                                      String token,
                                      String role){

        String url= KEYCLOAK_BASE+"/admin/realms/master/clients/"+clientId+"/roles/"+role;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer "+token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Void> request = new HttpEntity<>(headers);

        ResponseEntity<KeycloakRole> response = restTemplate.exchange(
                url, HttpMethod.GET, request, KeycloakRole.class);

        return response.getBody();
    }


    public KeycloakUserDto fetchFirstUserByUsername(String username, String token) throws Exception {

        String url= KEYCLOAK_BASE+"/admin/realms/master/users?username="+username;

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> request = new HttpEntity<>(headers);

        ResponseEntity<KeycloakUserDto[]> response = restTemplate.exchange(
                url, HttpMethod.GET, request, KeycloakUserDto[].class);

        KeycloakUserDto[] users = response.getBody();
        if(users!=null && users.length>0){
            return users[0];
        }
        throw  new Exception("User not found with username" +username);
    }


    public void assignRole(String userId,
                           String clientId,
                           List<KeycloakRole> roles,
                           String token) throws Exception {

        String url= KEYCLOAK_BASE+"/admin/realms/master/users/"+userId+"/role-mappings/clients/"+clientId;

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<List<KeycloakRole>> request = new HttpEntity<>(roles, headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    url, HttpMethod.POST, request, String.class);
        }catch (Exception e){
            throw  new Exception("Failed to assign new Role"+ e.getMessage());

        }
    }





    public KeycloakUserDto fetchUserProfileBtJwt(String token) throws Exception {

        String url= KEYCLOAK_BASE+"/realms/master/protocol/openid-connect/userinfo";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> request = new HttpEntity<>(headers);

        try {
            ResponseEntity<KeycloakUserDto> response = restTemplate.exchange(
                    url, HttpMethod.GET, request, KeycloakUserDto.class);
            return  response.getBody();
        }catch (Exception e){
            throw  new Exception("Failed to get user info  "+ e.getMessage());

        }
    }

}
