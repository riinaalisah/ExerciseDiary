package exercisediary.config;

import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.util.StringUtils;

import exercisediary.model.User;
import exercisediary.service.CustomUserService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import java.io.IOException;
import lombok.var;
import java.util.List;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

  private static final Logger log = LoggerFactory.getLogger(JwtAuthorizationFilter.class);
  

  public JwtAuthorizationFilter(AuthenticationManager authenticationManager) {
    super(authenticationManager);
  }

  @Override
  protected void  doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws IOException, ServletException {
    var authentication = getAuthentication(request);
    if (authentication == null) {
      filterChain.doFilter(request, response);
      return;
    }                   
    
    SecurityContextHolder.getContext().setAuthentication(authentication);
    filterChain.doFilter(request, response);
  } 

  private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
    var token = request.getHeader(SecurityConstants.TOKEN_HEADER);
    if (!StringUtils.isEmpty(token) && token.startsWith(SecurityConstants.TOKEN_PREFIX)) {
      try {
        var signingKey = SecurityConstants.JWT_SECRET.getBytes();

        var parsedToken = Jwts.parser()
          .setSigningKey(signingKey)
          .parseClaimsJws(token.replace("Bearer ", ""));

        var id = parsedToken
          .getBody()
          .getSubject();

        var authorities = ((List<?>) parsedToken.getBody()
          .get("rol")).stream()
          .map(authority -> new SimpleGrantedAuthority((String) authority))
          .collect(Collectors.toList());
        
        if (!StringUtils.isEmpty(id)) {
          return new UsernamePasswordAuthenticationToken(id, null, authorities);
        }
      } catch (ExpiredJwtException exception) {
        log.warn("Request to parse expired JWT : {} failed : {}", token, exception.getMessage());
      } catch (UnsupportedJwtException exception) {
          log.warn("Request to parse unsupported JWT : {} failed : {}", token, exception.getMessage());
      } catch (MalformedJwtException exception) {
          log.warn("Request to parse invalid JWT : {} failed : {}", token, exception.getMessage());
      } catch (SignatureException exception) {
          log.warn("Request to parse JWT with invalid signature : {} failed : {}", token, exception.getMessage());
      } catch (IllegalArgumentException exception) {
          log.warn("Request to parse empty or null JWT : {} failed : {}", token, exception.getMessage());
      }
    }

    return null;
  }


}