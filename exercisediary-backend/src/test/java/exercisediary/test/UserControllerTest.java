package exercisediary.test;

import exercisediary.model.User;
import exercisediary.repository.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.initMocks;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {

    private List<User> users;
    private User user1;
    private User user2;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserRepository userRepositoryMock;

    @Before
    public void setUp() {
        initMocks(this);

        this.users = new ArrayList<>();
        user1 = new User("username1", "firstname1", "lastname1", "password1");
        user2 = new User("username2", "firstname2", "lastname2", "password2");
        user1.setId("id1");
        user2.setId("id2");
        users.add(user1);
        users.add(user2);
    }

    @Test
    @WithMockUser
    public void usersAreRetrieved() throws Exception {
        when(userRepositoryMock.findAll()).thenReturn(users);

        mockMvc.perform(get("/users")).andExpect(status().isOk());

        verify(userRepositoryMock, times(1)).findAll();
    }

    @Test
    @WithMockUser
    public void oneUserIsRetrieved() throws Exception {
        when(userRepositoryMock.findById("id2")).thenReturn(java.util.Optional.ofNullable(user2));

        //mockMvc.perform(get("/users/id"));
    }

}

