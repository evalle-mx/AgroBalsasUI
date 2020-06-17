package com.agrob.ticket.web.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.agrob.ticket.web.vo.TodoVo;

@Service
public class TodoService {
	private static Logger logger = Logger.getLogger(TodoService.class);
	
	private static List<TodoVo> todos = new ArrayList<TodoVo>();
    private static int todoCount = 3;

    static {
    	//in28Minutes
        todos.add(new TodoVo(1, "in28minutes", "Learn Spring MVC", new Date(), false));
        todos.add(new TodoVo(2, "in28minutes", "Learn Struts", new Date(), false));
        todos.add(new TodoVo(3, "in28minutes", "Learn Hibernate", new Date(), false));
        //user
        todos.add(new TodoVo(4, "user", "Viajar por el mundo", new Date(), false));
        //Netto
        todos.add(new TodoVo(5, "admin", "Exámen IELTS", new Date(), false));
        todos.add(new TodoVo(5, "admin", "Ingresar Documentos", new Date(), false));
    }

    public List<TodoVo> retrieveTodos(String user) {
    	logger.debug("<retrieveTodos>");
        List<TodoVo> filteredTodos = new ArrayList<TodoVo>();
        for (TodoVo todo : todos) {
            if (todo.getUser().equalsIgnoreCase(user)) {
                filteredTodos.add(todo);
            }
        }
        return filteredTodos;
    }
    
    public TodoVo retrieveTodo(int id) {
    	logger.debug("<retrieveTodo>");
        for (TodoVo todo : todos) {
            if (todo.getId()==id) {
                return todo;
            }
        }
        return null;
    }

    public void updateTodo(TodoVo todo){
    	logger.debug("<updateTodo>");
    		todos.remove(todo);
    		todos.add(todo);
    }

    public void addTodo(String name, String desc, Date targetDate,
            boolean isDone) {
    	logger.debug("<addTodo>");
        todos.add(new TodoVo(++todoCount, name, desc, targetDate, isDone));
    }

    public void deleteTodo(int id) {
    	logger.debug("<deleteTodo>");
        Iterator<TodoVo> iterator = todos.iterator();
        while (iterator.hasNext()) {
            TodoVo todo = iterator.next();
            if (todo.getId() == id) {
                iterator.remove();
            }
        }
    }
}