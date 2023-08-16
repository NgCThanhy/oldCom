#include <bits/stdc++.h>
#include <string.h>
#include <iostream>

using namespace std;


class Node {
public:
    string data;
    Node* left;
    Node* right;
	
	static Node * CreateNode(string data){
		Node *newNode = new Node;
		newNode->data = data;
    	newNode->left = NULL;
    	newNode->right = NULL;
    	return newNode;
	}
	
};

class BinaryTree{
	void AddNode(Node *& root, string key){
		Node* newNode = Node::CreateNode(key);
		int t = IsOperator(key);
		
		if(root != NULL){
			AddNode(root->right, key);
			if(t = 0)
				AddNode(root->left, key);
		}
		else{
			root = newNode;
		}
	}

	void PrintNode(Node* root){
		if(root != NULL){
			PrintNode(root->left);
			PrintNode(root->right);
			cout<<root->data<<" ";
		}
	}

	int IsOperator(string key){
		if(key == "+" || 
		   key == "-" ||
		   key == "*" || key == "/"
		)
			return 1;
		else
			return 0;
	}

	void TakeResult(Node* root){
		int a, b;
		if(root != NULL){
			TakeResult(root->left);
			TakeResult(root->right);
			
			if(IsOperator(root->data) == 0){
				float t = stof(root->data);
				op.push(t);
			}
			else{
				
				float b = op.top();
				op.pop();
				
				float a = op.top();
				op.pop();
				
				float x;
				 
				if(root->data.compare("+") == 0)	x = a + b;
		        if(root->data.compare("-") == 0)	x = a - b;
				if(root->data.compare("*") == 0)	x = a * b;
				if(root->data.compare("/") == 0)	x = a / b;
				
				op.push(x);
			}
		}
			
	}

	Node * treeRoot;
	
	string infix; // trung to: x+y-z
	vector < string > postfix; // hau to: xy+z-
//	string prefix; // tien to: -+xyz

	stack < float > op;

public:
	
	BinaryTree(){
		this->treeRoot = NULL;
	}
	
	void PrintTree(){
		PrintNode(this->treeRoot);
		cout<<endl;
	}	
	
	void PrintResult(){
		TakeResult(this->treeRoot);
		cout<<"ket qua: "<<op.top()<<endl;
	}
	
	void InitTree(){
		cout<<" nhap bieu thuc"<<endl;
		cin>>infix;
		ToPostfix();
		for(int i = postfix.size() - 1; i >= 0; i--)
			AddNode(this->treeRoot, postfix.at(i) );
	}
	
	
//////////

	int priority(char x){ // xet do uu tien
	    if(x == '^' || x == '%')
	    	return 3;
		else if (x == '*' || x == '/')
	        return 2;
	    else if (x == '+' || x == '-')
	        return 1;
	    else if (x == '(')
	        return 0;
	}

	void ToPostfix(){
		stack < char > sp;
		int i = 0; // index cua infix
		int n = infix.size();
		
		while (i < n){
			
			if(infix[i] == '(' ){ // neu dau ( thi day vao ngan xep
				sp.push(infix[i]);
	            ++i;
			}
			else if(infix[i] >= '0' && infix[i] <= '9'){ // neu la mot chuoi so thi dua vao postfix
				string number;
	   
	            while (i < n && infix[i] >= '0' && infix[i] <= '9'){
	                number += infix[i];
	                ++i;
	            }	
	            postfix.push_back(number);	
			}
	        else if (infix[i] == ')' ){ // neu la dau ) thi pop tu stack vao postfix den khi gap (
	           
			    while (sp.top() != '('){  // "den khi gap ("
	                string t = "";
	                t += sp.top();
					postfix.push_back(t); 
					sp.pop();
	            }
	
	            sp.pop(); // xoa ca ( ra khoi stack
	        }
	        else{ // con lai la toan tu
	        	
	        	// khi toan tu infix[i] co do uu tien thap hon cai da co truoc
	        	// => nhet cai co do uu tien cao hon vao postfix
	        	while (!sp.empty() && priority(sp.top()) >= priority(infix[i]))
	            {
	            	string t = "";
	                t += sp.top();
					postfix.push_back(t);
	                sp.pop();
	            }
	
				// sau do nhet cai nho hon vao stack
	            sp.push(infix[i]); 
	            ++i;
	        }
		}
		
		
		while ( !sp.empty() ){ // nhet phan con lai trong stack vao postfix
	        string t = "";
            t += sp.top();
			postfix.push_back(t); 
	        sp.pop();
	    }
	}

};


int main()
{
	BinaryTree t1;
	t1.InitTree();
	t1.PrintTree();
	t1.PrintResult();
	return 0;
}
