package com.agrob.ticket.web.ctrl;

/**
 * Controlador para obtener ToDo's Demo del ejemplo 
 */
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.validation.Valid;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.agrob.ticket.web.service.TodoService;
//import com.in28minutes.springboot.web.service.LoginService;
import com.agrob.ticket.web.vo.TodoVo;
import com.agrob.ticket.web.vo.UsuarioVo;

@Controller
@SessionAttributes("usuario")	//name")
public class TodoController {
	
	private static Logger logger = Logger.getLogger(TodoController.class);
	
	@Autowired
	TodoService service;
	
	@InitBinder
	public void initBinder(WebDataBinder binder) {
		// Date - dd/MM/yyyy
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		binder.registerCustomEditor(Date.class, new CustomDateEditor(
				dateFormat, false));
	}
	
	@RequestMapping(value="/list-todos", method = RequestMethod.GET)
	public String showTodos(ModelMap model){
		logger.debug("<showTodos>");
		String name = ((UsuarioVo) model.get("usuario")).getUserName(); 
				//(String) model.get("name");
		model.put("todos", service.retrieveTodos(name));
		return "list-todos";
	}
	
	@RequestMapping(value="/add-todo", method = RequestMethod.GET)
	public String showAddTodoPage(ModelMap model){
		logger.debug("<showAddTodoPage>");
		model.addAttribute("todo", new TodoVo(0, getLoggedInUserName(model),
				"Default Desc", new Date(), false));
		return "todo";
	}

	@RequestMapping(value = "/delete-todo", method = RequestMethod.GET)
	public String deleteTodo(@RequestParam int id) {
		logger.debug("<deleteTodo>");
		if(id==1)
			throw new RuntimeException("Excepcion programada para id=1");
		
		service.deleteTodo(id);
		return "redirect:/list-todos";
	}

	@RequestMapping(value = "/update-todo", method = RequestMethod.GET)
	public String showUpdateTodoPage(@RequestParam int id, ModelMap model) {
		logger.debug("<showUpdateTodoPage>");
		TodoVo todo = service.retrieveTodo(id);
		model.put("todo", todo);
		return "todo";
	}

	@RequestMapping(value = "/update-todo", method = RequestMethod.POST)
	public String updateTodo(ModelMap model, @Valid TodoVo todo,
			BindingResult result) {
		logger.debug("<updateTodo>");
		if (result.hasErrors()) {
			return "todo";
		}

		todo.setUser(getLoggedInUserName(model));

		service.updateTodo(todo);

		return "redirect:/list-todos";
	}

	@RequestMapping(value = "/add-todo", method = RequestMethod.POST)
	public String addTodo(ModelMap model, @Valid TodoVo todo, BindingResult result) {
		logger.debug("<addTodo>");
		if (result.hasErrors()) {
			return "todo";
		}

		service.addTodo(getLoggedInUserName(model), todo.getDesc(), todo.getTargetDate(),
				false);
		return "redirect:/list-todos";
	}

	private String getLoggedInUserName(ModelMap model) {
		logger.debug("<getLoggedInUserName>");
		Object principal;
		String userName = "";
//		principal = SecurityContextHolder.getContext()
//				.getAuthentication().getPrincipal();
//		if (principal instanceof UserDetails) {
//			return ((UserDetails) principal).getUsername();
//		}
		//principal= model.get("name");
		principal= model.get("usuario");
		if(principal instanceof UsuarioVo){
			userName= ((UsuarioVo)principal).getUserName();
		}
		return userName;
	}

}
